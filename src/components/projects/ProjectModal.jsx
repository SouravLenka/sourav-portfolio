import "./project-modal.css";

const ProjectModal = ({ project, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <img src={project.image} alt={project.title} />

        <h2>{project.title}</h2>
        <p>{project.description}</p>

        <div className="tech-stack">
          {project.tech.map((t, index) => (
            <span key={index}>{t}</span>
          ))}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="github-btn"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default ProjectModal;
