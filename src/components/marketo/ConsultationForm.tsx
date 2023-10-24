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
            MktoForms2.loadForm("https://landing.go.cambriausa.com", "423-TGU-525", 1104, function (form) {
                form.vals({
                    "Pardot_PD_Account_Id__c": props.profile.id,
                    "Pardot_PD_Web_Locator_Id__c": props.profile.c_cRMID
                });

                form.onSuccess(function (values) {
                    addToDataLayer({
                        ...values,
                        event: "formSubmitted"
                    });
                });
            });
        }
    }, [scriptLoaded]);

    const loadMarketoScript = (callback) => {
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
        </div>
    );
};

export default ConsultationForm;