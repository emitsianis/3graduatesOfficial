import React from "react";

export default () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center footer">
      Copyright &copy; {new Date().getFullYear()} 3gO
      <a
        href="https://github.com/emitsianis/3graduatesOfficial"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginLeft: "1em", color: "white" }}
      >
        <i className="fab fa-github fa-2x" />
      </a>
    </footer>
  );
};
