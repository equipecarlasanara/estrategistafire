from datetime import datetime, timezone
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class UsageService:
    def __init__(self, db):
        self.db = db

    def _get_period(self, period_type: str) -> str:
        """
        Retorna o identificador do período atual.
        period_type: 'daily', 'monthly', 'yearly'
        """
        now = datetime.now(timezone.utc)
        if period_type == 'daily':
            return now.strftime("%Y-%m-%d")
        elif period_type == 'monthly':
            return now.strftime("%Y-%m")
        elif period_type == 'yearly':
            return now.strftime("%Y")
        return ""

    async def check_usage(self, user_id: str, feature: str, limit: int, period_type: str) -> bool:
        """
        Verifica se o usuário ainda tem saldo para a funcionalidade.
        """
        period = self._get_period(period_type)
        usage = await self.db.usage_tracking.find_one({
            "user_id": user_id,
            "feature": feature,
            "period": period
        })
        
        count = usage.get("count", 0) if usage else 0
        return count < limit

    async def increment_usage(self, user_id: str, feature: str, period_type: str):
        """
        Incrementa o contador de uso.
        """
        period = self._get_period(period_type)
        usage = await self.db.usage_tracking.find_one({
            "user_id": user_id,
            "feature": feature,
            "period": period
        })
        
        if usage:
            await self.db.usage_tracking.update_one(
                {"user_id": user_id, "feature": feature, "period": period},
                {"count": usage["count"] + 1}
            )
        else:
            await self.db.usage_tracking.insert_one({
                "user_id": user_id,
                "feature": feature,
                "period": period,
                "count": 1
            })
