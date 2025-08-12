import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <img
        src="tcsind.png"
        alt="TCS Indústria Metalúrgica"
        className="header-logo"
      />
      <h1 className="header-title">Gerador de Orçamento</h1>
    </div>
  );
}

export default Header;