document.addEventListener("DOMContentLoaded", () => {
    const templates = [
        { templateId: "bookIconTemplate", className: "bookIconContainer" },
        { templateId: "timeBeginningIconTemplate", className: "timeBeginningIconContainer" },
        { templateId: "timeBeginningDarkerIconTemplate", className: "timeBeginningDarkerIconContainer" },
        { templateId: "bloodIconTemplate", className: "bloodIconContainer" },
        { templateId: "brokenShieldTemplate", className: "brokenShieldContainer" },
        { templateId: "healthIconTemplate", className: "healthIconContainer" },
        { templateId: "skullIconTemplate", className: "skullIconContainer" },
        { templateId: "stomachIconTemplate", className: "stomachIconContainer" },
        { templateId: "radiationSignIconTemplate", className: "radiationSignIconContainer" },
        { templateId: "hourglassIconTemplate", className: "hourglassIconContainer" },
        { templateId: "downArrowIconTemplate", className: "downArrowIconContainer" },
        { templateId: "backPainIconTemplate", className: "backPainIconContainer" },
        { templateId: "headacheIconTemplate", className: "headacheIconContainer" },
        { templateId: "nauseaIconTemplate", className: "nauseaIconContainer" },
        { templateId: "skinIconTemplate", className: "skinIconContainer" },
        { templateId: "vomitingIconTemplate", className: "vomitingIconContainer" },
        { templateId: "medicalBagIconTemplate", className: "medicalBagIconContainer" },
        { templateId: "ghostIconTemplate", className: "ghostIconContainer" },
        { templateId: "brokenMirrorIconTemplate", className: "brokenMirrorIconContainer" },
        { templateId: "atomIconTemplate", className: "atomIconContainer" },
        { templateId: "woundIconTemplate", className: "woundIconContainer" },
        { templateId: "boneIconTemplate", className: "boneIconContainer" },
        { templateId: "gutIconTemplate", className: "gutIconContainer" },
        { templateId: "stomachBleedingIconTemplate", className: "stomachBleedingIconContainer" },
        { templateId: "grimReaperIconTemplate", className: "grimReaperIconContainer" },
    ]; //this holds the id/class for our templates

    async function loadTemplates() { //async since it may take a bit to load
        try {
            const response = await fetch('templates/templates.html'); //use fetch to get templates
            if (!response.ok) throw new Error(`Failed to load templates: ${response.statusText}`); //go to catch if it fails to get templates

            const templatesHTML = await response.text(); //convert response variable into a text string
            const templateContainer = document.createElement('div'); //div to hold our templates
            templateContainer.innerHTML = templatesHTML; //we fill our new div with all the text we fetched
            document.body.appendChild(templateContainer); //we add our div to the bottom of the doc body

            templates.forEach(({ templateId, className }) => { //loop through and add the svgs
                const templateContent = document.querySelector(`#${templateId}`).content; //we find the templates we just added by their ID's
                document.querySelectorAll(`.${className}`).forEach(container => { //finds all elements that have their class name set, adds the template content inside them.
                    container.appendChild(templateContent.cloneNode(true)); //adds the content, clones it for reusability
                });
            });

        } catch (error) {
            console.error(error);
            showAlertWithLocalStorage(); //if it fails, we throw an error, then run this function
        }
    }

    function showAlertWithLocalStorage() {
        const alertKey = "alertShownCount";
        const maxCount = 2; //how many times to show you

        const currentCount = parseInt(localStorage.getItem(alertKey)) || 0; //get current total, or default to 0

        // This is here if you open the website directly from a file. I set a count so it wont bother you after you've read it.
        if (currentCount < maxCount) {
            alert("Modern websites rely on server environments to operate correctly due to browser security features like the Same-Origin Policy. While I’ve developed the project to reflect real-world practices, it may require running on a local server (e.g., VS Code Live Server) to function fully.");
            localStorage.setItem(alertKey, currentCount + 1);
        }
    }

    loadTemplates(); //run this function after DOM is loaded. 
});
