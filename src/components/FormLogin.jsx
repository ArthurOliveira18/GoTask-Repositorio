import Style from '../styles/FormLogin.module.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const FormLogin = () => {
  return (
    <div className = {Style.formMain}>
      <Form className={Style.formLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Digite o seu email" />

        </Form.Group>

        <div className={Style.groupButton}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Digite sua senha" />
          </Form.Group>
          
        </div> 

        <div className={Style.buttonLayout}>
          <Button variant="primary" type="submit">
              Enviar-me
            </Button>
        </div>
      </Form>
    </div>
  )
}

export default FormLogin