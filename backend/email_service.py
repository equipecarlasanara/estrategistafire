import os
import resend
import logging
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure Resend
resend.api_key = os.environ.get('RESEND_API_KEY')

logger = logging.getLogger(__name__)

def send_diagnosis_email(to_email: str, user_name: str, diagnosis_text: str):
    """
    Envia o diagnóstico estratégico por e-mail para o usuário.
    """
    try:
        if not resend.api_key:
            logger.error("RESEND_API_KEY não encontrada no ambiente.")
            return False

        params = {
            "from": "Estrategista <onboarding@resend.dev>", # Nota: Usando domínio de teste do Resend
            "to": [to_email],
            "subject": f"Seu Diagnóstico Estratégico - {user_name}",
            "html": f"""
                <h1>Olá, {user_name}!</h1>
                <p>Aqui está o seu diagnóstico estratégico gerado pela <strong>Estrategista</strong>:</p>
                <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px; border-left: 5px solid #000;">
                    {diagnosis_text.replace('\n', '<br>')}
                </div>
                <p>Vamos para cima! 🚀</p>
                <hr>
                <p><small>Este e-mail foi enviado automaticamente. Não responda.</small></p>
            """,
        }

        email = resend.Emails.send(params)
        logger.info(f"E-mail de diagnóstico enviado para {to_email}. ID: {email['id']}")
        return True
    except Exception as e:
        logger.error(f"Erro ao enviar e-mail via Resend: {str(e)}")
        return False

def send_recovery_email(to_email: str, user_name: str, recovery_link: str):
    """
    Envia o e-mail de recuperação de senha com link de redefinição.
    """
    try:
        if not resend.api_key:
            logger.error("RESEND_API_KEY não encontrada no ambiente.")
            return False

        params = {
            "from": "Estrategista <onboarding@resend.dev>",
            "to": [to_email],
            "subject": "Recuperação de Senha - Estrategista",
            "html": f"""
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1E0505; background-color: #080808; color: #E0E0E0; border-radius: 12px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #C0392B; margin: 0;">Estrategista Digital</h2>
                    </div>
                    <p style="font-size: 16px;">Olá, <strong>{user_name}</strong>!</p>
                    <p style="font-size: 14px; line-height: 1.6;">Recebemos uma solicitação para redefinir a senha da sua conta na Estrategista.</p>
                    <p style="font-size: 14px; line-height: 1.6;">Clique no botão abaixo para cadastrar uma nova senha (este link expira em 15 minutos):</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{recovery_link}" style="display: inline-block; background: linear-gradient(135deg, #7A1010, #C0392B); color: #fff; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 15px rgba(192,57,43,0.3);">Redefinir Minha Senha</a>
                    </div>
                    <p style="font-size: 12px; color: #666; line-height: 1.6;">Se você não solicitou a redefinição de senha, por favor ignore este e-mail. Sua conta continua segura.</p>
                    <hr style="border: 0; border-top: 1px solid #1A0505; margin: 20px 0;">
                    <p style="font-size: 11px; color: #444; text-align: center;">Este e-mail foi enviado automaticamente. Não responda.</p>
                </div>
            """,
        }

        email = resend.Emails.send(params)
        logger.info(f"E-mail de recuperação enviado para {to_email}. ID: {email['id']}")
        return True
    except Exception as e:
        logger.error(f"Erro ao enviar e-mail de recuperação via Resend: {str(e)}")
        return False

