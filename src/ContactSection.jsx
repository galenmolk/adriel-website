import Header from "./Header";

export default function ContactSection() {
    return (
        <div className="section">
            <Header content={'Get In Touch'} size={40}/>
            <ul>
                <li>
                <a href="mailto:molkadriel@gmail.com">
                            molkadriel@gmail.com
                        </a>
                </li>
            </ul>
        </div>
    );
};
