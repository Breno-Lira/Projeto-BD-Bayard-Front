import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignal, faStore } from '@fortawesome/free-solid-svg-icons'
import bayard from '../assets/bayard.png'
import esporte1 from '../assets/imagemcorrida.jpg'
import esporte2 from '../assets/imagemsenna.png'

export default function HomePage() {
  const [imagem, setImagem] = useState(null)
  const navigate = useNavigate()

  const handleImagemChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagem(URL.createObjectURL(file))
    }
  }

  const handleClick = () => {
    navigate('/dashboardvendas')
  }

  const handleClick2 = () => {
    navigate('/dashboardestoque')
  }

  return (
    <>
      <style>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f0f2f5;
          gap: 30px;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .centerRow {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 20px;
          width: 100%;
          max-width: 1200px;
        }
        .sideContainer {
          width: 280px;     /* aumentei */
          height: 420px;    /* aumentei */
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .sideContainer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }
        .imagem {
          width: 520px;
          max-width: 90vw;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          object-fit: contain;
        }
        .botoesContainer {
          display: flex;
          gap: 40px;
          margin-top: 10px;
        }
        .botao {
          background-color: #dc3545;
          border: none;
          color: white;
          padding: 18px 40px;
          font-size: 1.25rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 8px rgba(220,53,69,0.4);
          transition: 
            background-color 0.3s, 
            box-shadow 0.3s,
            transform 0.2s;
          user-select: none;
        }
        .botao:hover {
          background-color: #c82333;
          box-shadow: 0 6px 12px rgba(200,35,51,0.6);
          transform: translateY(-8px);
        }
      `}</style>

      <div className="container">

        <div className="centerRow">
          <div className="sideContainer">
            {/* foto do esporte à esquerda */}
            <img src={esporte1} alt="Esporte 1" />
          </div>

          <img src={imagem || bayard} alt="perfil" className="imagem" />

          <div className="sideContainer">
            {/* foto do esporte à direita */}
            <img src={esporte2} alt="Esporte 2" />
          </div>
        </div>

        <div className="botoesContainer">
          <button onClick={handleClick} className="botao">
            <FontAwesomeIcon icon={faSignal} size="lg" />
            Vendas
          </button>

          <button onClick={handleClick2} className="botao">
            <FontAwesomeIcon icon={faStore} size="lg" />
            Estoque
          </button>
        </div>
      </div>
    </>
  )
}
