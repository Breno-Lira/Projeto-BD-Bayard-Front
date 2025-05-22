import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignal } from '@fortawesome/free-solid-svg-icons'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import bayard from '../assets/bayard.png'

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
    navigate('/dashboardvendas');
  }

  const handleClick2 = () => {
    navigate('/dashboardestoque');
  }


  return (
    <div className='container'>
      <img src={bayard} alt='perfil' style={{ width: '550px' }} />

      <td>
        <button onClick={handleClick} className='btn btn-danger btn-sm'>
          <FontAwesomeIcon icon={faSignal} /> Dashboard de Vendas
        </button>

        <button onClick={handleClick2} className='btn btn-danger btn-sm'>
          <FontAwesomeIcon icon={faStore} /> Dashboard de Estoque Produto
        </button>
      </td>
    </div>
  )
}
