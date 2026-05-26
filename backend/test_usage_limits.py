import asyncio
import uuid
from d1_client import D1Client
from usage_service import UsageService

async def test_usage():
    db = D1Client()
    usage_service = UsageService(db)
    user_id = str(uuid.uuid4()) # Novo usuário para teste isolado
    
    print(f"Testando limites para usuário {user_id}...")
    
    # Teste: Editor de fotos (Limite 2/dia)
    can_use = await usage_service.check_usage(user_id, "edit_image", 2, "daily")
    print(f"Editor: Pode usar? {can_use}") # True
    
    await usage_service.increment_usage(user_id, "edit_image", "daily")
    await usage_service.increment_usage(user_id, "edit_image", "daily")
    
    can_use = await usage_service.check_usage(user_id, "edit_image", 2, "daily")
    print(f"Editor após 2 usos: Pode usar? {can_use}") # False
    
    # Teste: Ensaio fotográfico (Limite 10/mês)
    print("\nTestando Ensaio Fotográfico...")
    for i in range(10):
        await usage_service.increment_usage(user_id, "photoshoot", "monthly")
    
    can_use = await usage_service.check_usage(user_id, "photoshoot", 10, "monthly")
    print(f"Ensaio após 10 usos: Pode usar? {can_use}") # False
    
    # Teste: Análise de perfil (Limite 4/ano)
    print("\nTestando Análise de Perfil...")
    for i in range(4):
        await usage_service.increment_usage(user_id, "profile_analysis", "yearly")
    
    can_use = await usage_service.check_usage(user_id, "profile_analysis", 4, "yearly")
    print(f"Análise após 4 usos: Pode usar? {can_use}") # False

if __name__ == "__main__":
    asyncio.run(test_usage())
