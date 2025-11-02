import sys

from config import logger


def log_exception_wrapper(function: callable) -> callable:
    """Wrapper for catching general exceptions.

    Returns:
        The wrapped exception handler function.
    """

    def wrapper_try_except(*args, **kwargs) -> None:
        """Inner wrapper for catching general exceptions."""
        logger.info("Process Started", extra={"run_time": "Start"})

        try:
            function(*args, **kwargs)
        except Exception:  # noqa: BLE001
            logger.exception("Program stopped unexpectedly.")

        logger.info("Process Ended", extra={"run_time": "Stop"})

        sys.exit()

    return wrapper_try_except
