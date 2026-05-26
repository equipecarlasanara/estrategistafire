from email_service import send_diagnosis_email
import sys

def test_email():
    print("Testando envio de e-mail via Resend...")
    # Usando o e-mail do usuário para teste ou um placeholder
    to_email = "carla@exemplo.com" # Placeholder, o usuário pode alterar para testar
    user_name = "Carla"
    diagnosis_text = "Seu negócio está no Estágio 2. Gargalo: Aquisição.\nPlano de ação: Focar em tráfego pago na Semana 1."
    
    success = send_diagnosis_email(to_email, user_name, diagnosis_text)
    if success:
        print("Sucesso! E-mail enviado (ou aceito pelo Resend).")
    else:
        print("Falha ao enviar e-mail. Verifique os logs e a chave API.")

if __name__ == "__main__":
    test_email()
