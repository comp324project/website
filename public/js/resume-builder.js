class ResumePreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: "",
            experience: "",
            project: "",
            research: "",
            volunteering: "",
            education: "",
            certifications: "",
            references: ""
        };
    }

    componentDidMount() {
        document.querySelectorAll("textarea").forEach((textarea) => {
            textarea.addEventListener("input", this.updateStateFromForm);
        });
    }

    updateStateFromForm = () => {
        this.setState({
            skills: document.getElementById("skills").value,
            experience: document.getElementById("experience").value,
            project: document.getElementById("projects").value,
            research: document.getElementById("research").value,
            volunteering: document.getElementById("volunteering").value,
            education: document.getElementById("education").value,
            certifications: document.getElementById("certifications").value,
            references: document.getElementById("references").value
        });
    };

    render() {
        return (
            <div className="resume-preview">
                <h2>Resume Preview</h2>
                {Object.entries(this.state).map(([key, value]) => 
                value ? (
                    <div key={key} className="resume-section">
                        <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                        <p>{value}</p>
                    </div>
                ) : null
                )}
            </div>
        );
    }
}

// Mount the ResumePreview component to the DOM
ReactDOM.render(
    <ResumePreview />,
    document.getElementById("resume-preview")
);