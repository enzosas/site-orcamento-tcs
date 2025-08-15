import "./Pricing.css"

function Pricing(){
    return (
        <div className="main-pricing">
            
            <div className="unidade">
                <p className="descricao">Talha Elétrica sem circuito</p>
                <p className="dinheiro">R$ 7.221,60</p>

            </div>
            <div className="unidade">
                <p className="descricao">Circuito Elétrico Schneider</p>
                <p className="dinheiro">-</p>
            </div>
            <div className="unidade">
                <p className="descricao">Circuito Elétrico TCS</p>
                <p className="dinheiro">-</p>
            </div>
            <div className="unidade">
                <p className="descricao">Adaptador de Viga</p>
                <p className="dinheiro">-</p>
            </div>
            <div className="unidade">
                <p className="descricao">Total com Painel Schneider</p>
                <p className="dinheiro">R$ 7.221,60</p>
            </div>
            <div className="unidade">
                <p className="descricao">Total Com Painel TCS</p>
                <p className="dinheiro">R$ 7.221,60</p>
            </div>
        </div>
    )
}

export default Pricing;