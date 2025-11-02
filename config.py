__all__ = ["LOGGER_NAME", "logger"]

import logging
from datetime import UTC, datetime
from pathlib import Path

LOGGER_NAME = "humble_steam_key_redeemer"

# Set up logger
log_path = Path("_logs").resolve()
log_path.mkdir(exist_ok=True, parents=True)
start_time = datetime.now(UTC)
LOG_FILE = log_path / start_time.strftime("hkr_%Y%m%d_%H%M%S")
logger = logging.getLogger(LOGGER_NAME)
logging.basicConfig(filename=LOG_FILE.with_suffix(".log"), level=logging.DEBUG)
