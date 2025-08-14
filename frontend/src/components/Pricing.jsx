import "./Pricing.css"

function Pricing(){
    return (
        <div className="main-pricing">
            <p className="descricao">Talha Elétrica sem circuito</p>
            <p className="dinheiro">R$ 7.221,60</p>

            <p className="descricao">Circuito Elétrico Schneider</p>
            <p className="dinheiro">-</p>

            <p className="descricao">Circuito Elétrico TCS</p>
            <p className="dinheiro">-</p>

            <p className="descricao">Adaptador de Viga</p>
            <p className="dinheiro">-</p>

            <p className="descricao">Total com Painel Schneider</p>
            <p className="dinheiro">R$ 7.221,60</p>

            <p className="descricao">Total Com Painel TCS</p>
            <p className="dinheiro">R$ 7.221,60</p>
        </div>
    )
}

export default Pricing;