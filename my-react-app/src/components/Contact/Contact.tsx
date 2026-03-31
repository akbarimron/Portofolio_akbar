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
      <div className="sw center">
        <h2 className="contact-h reveal-up">Let's <em>Work Together</em></h2>
        <p className="contact-sub reveal-up" style={{ animationDelay: '0.1s' }}>Looking for a partner for your next digital project? Let's collaborate and build something great together. Drop me a message!</p>

        <div className="cgrid">
          <div className="reveal-left" style={{ animationDelay: '0.2s' }}>
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

          <div className="reveal-right" style={{ animationDelay: '0.3s' }}>
            <label className="flbl">Name</label>
            <input
              className="finput reveal-up"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ animationDelay: '0.35s' }}
            />
            <label className="flbl">Email</label>
            <input
              className="finput reveal-up"
              type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ animationDelay: '0.4s' }}
            />
            <label className="flbl">Message</label>
            <textarea
              className="ftextarea reveal-up"
              placeholder="Tell us about your project..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ animationDelay: '0.45s' }}
            ></textarea>
            <button className="btn-send reveal-up" onClick={handleSend} style={{ animationDelay: '0.5s' }}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
