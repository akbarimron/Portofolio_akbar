import './Navigation.css';

export default function Navigation() {
  return (
    <nav>
      <div className="nav-logo">Akbar Imron</div>
      <ul className="nav-links">
        <li><a href="#who">About</a></li>
        <li><a href="#projects">Project</a></li>
        <li><a href="#contact">Contact Me</a></li>
      </ul>
    </nav>
  );
}
