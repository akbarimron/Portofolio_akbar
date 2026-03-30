import { useState } from 'react';
import { sendMessage } from '../../utils/animations';
import './Contact.css';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
    // Trigger animation
    sendMessage(btn);
  };

  return (
    <section id="contact">
      <div className="sw center reveal">
        <h2 className="contact-h">Let's <em>Work Together</em></h2>
        <p className="contact-sub">Looking for a partner for your next digital project? Let's collaborate and build something great together. Drop me a message!</p>

        <div className="cgrid">
          <div>
            <div className="ci-lbl">Email</div>
            <div className="ci-val">
              <a href="mailto:akbarimrons@gmail.com">akbarimrons@gmail.com</a>
            </div>

            <div className="ci-lbl">Social Media</div>
            <div className="ci-val">
              <div className="ci-links">
                <a href="https://instagram.com/akbar_diy" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a href="https://github.com/akbarimron" target="_blank" rel="noopener noreferrer">
                  Github
                </a>
                <a href="https://linkedin.com/in/muhamad-akbar-imron" target="_blank" rel="noopener noreferrer">
                  Linkedin
                </a>
                <a href="https://youtube.com/@calisbare" target="_blank" rel="noopener noreferrer">
                  Youtube
                </a>
              </div>
            </div>

            <div className="ci-lbl">Location</div>
            <div className="ci-val">Indonesia</div>
          </div>

          <div>
            <label className="flbl">Name</label>
            <input
              className="finput"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="flbl">Email</label>
            <input
              className="finput"
              type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="flbl">Message</label>
            <textarea
              className="ftextarea"
              placeholder="Tell us about your project..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="btn-send" onClick={handleSend}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
