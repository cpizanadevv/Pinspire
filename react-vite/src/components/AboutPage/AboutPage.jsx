import './AboutPage.css';

const AboutPage = () => {
    return (
        <div className="about-page">
            <h1>Meet the team behind Pinspire</h1>
            <div className="profile-section">
                <div className="profile-box">
                    <div className="pfp">
                        <img src="./nhat-pfp.jpg" alt="Nhat" />
                    </div>
                    <h3>Nhat Ngo</h3>
                    <p>Web Developer</p>
                    <a href="https://www.linkedin.com/in/nhat-ngo-590823149/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-linkedin linkedin-icon"></i>
                    </a>
                </div>

                <div className="profile-box">
                    <div className="pfp">
                        <img src="./nicole-pfp.jpg" alt="Nicole" />
                    </div>
                    <h3>Nicole Magallanes</h3>
                    <p>Web Developer</p>
                    <a href="https://www.linkedin.com/in/nicolemagallanes/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                        <i className="fa-brands fa-linkedin linkedin-icon"></i>
                    </a>
                </div>

                <div className="profile-box">
                    <div className="pfp">
                        <img src="./penelope-pfp.jpg" alt="Penelope" />
                    </div>
                    <h3>Penelope Yang</h3>
                    <p>Web Developer</p>
                    <a href="https://www.linkedin.com/in/penelope-yang/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                        <i className="fa-brands fa-linkedin linkedin-icon"></i>
                    </a>
                </div>

                <div className="profile-box">
                    <div className="pfp">
                        <img src="./cj-pfp.jpg" alt="Cj" />
                    </div>
                    <h3>Carol Pizana</h3>
                    <p>Web Developer</p>
                    <a href="https://www.linkedin.com/in/cpizanadevv/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                        <i className="fa-brands fa-linkedin linkedin-icon"></i>
                    </a>
                </div>
            </div>

            <div className="github-section">
                <a href="https://github.com/cpizanadevv/Pinspire" target="_blank" rel="noopener noreferrer" className="github-link">
                    <i className="fa-brands fa-github"></i>
                    <h3>View Pinspire on GitHub</h3>
                </a>
            </div>
        </div>
    );
};

export default AboutPage;
