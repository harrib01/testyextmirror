import React, { useEffect, useState } from "react";
import { LocationProfile } from "../../types/entities";
import "src/components/marketo/ConsultationForm.css";
import { addToDatalayer } from "src/components/common/GTMhelper";


type consultationFormProps = {
    profile: LocationProfile
}

const ConsultationForm = (props: consultationFormProps) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        loadMarketoScript(() => {
            setScriptLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (scriptLoaded) {
            // Including the Marketo form via Script tag
            // It is not a module, and don't want it loaded unless used
            // Therefore need to ignore this reference for check-types
            // @ts-ignore
            MktoForms2.loadForm("https://landing.go.cambriausa.com", "423-TGU-525", 1104, function (form: any) {
                form.vals({
                    "Pardot_PD_Account_Id__c": props.profile.c_cRMID,
                    "Pardot_PD_Web_Locator_Id__c": props.profile.id
                });

                form.onSuccess(function (values: any) {
                    addToDatalayer({
                        event: "dealer locator lead form submit",
                        accountName: props.profile.name,
                        dealerID: props.profile.id,
                        salesRegionID: props.profile.c_salesRegionID,
                        salesRegionName: props.profile.c_salesName,
                        dealerCategory: props.profile.c_customCategory,
                        CRMID: props.profile.c_cRMID
                    });

                    form.getFormElem().hide();
                    const confirmForm = document.getElementById('confirmform');
                    if (confirmForm) {
                        confirmForm.style.visibility = 'visible';
                    }

                    // Returning false prevents form from navigating away
                    return false;
                });
            });
        }
    }, [scriptLoaded]);

    const loadMarketoScript = (callback: any) => {
        const alreadyExists = document.getElementById('mktoScript');

        if (!alreadyExists) {
            const script = document.createElement('script');
            script.id = 'mktScript';
            script.type = "text/javascript";
            script.async = true;
            script.src = 'https://landing.go.cambriausa.com/js/forms2/js/forms2.min.js';

            document.body.appendChild(script);

            script.onload = () => {
                callback && callback();
            }

            alreadyExists && callback && callback();
        }
    }

    return (
        <div className="marketo-form-component">
            <form id="mktoForm_1104"></form>
            <div id="confirmform"><p>Thank you for your submission.</p></div>
        </div>
    );
};

export default ConsultationForm;