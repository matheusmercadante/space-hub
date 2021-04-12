import sys
import asyncio

import tornado.ioloop
from classes.rabbitmq_tornado import TornadoAdapter
from tornado import gen

from services.read_sheet import read_sheet

RABBIT_URI = "amqp://guest:guest@localhost:5672/"

@gen.coroutine
def handle_message(logger, message):
    logger.info("File request {}".format(message))
    res = read_sheet(message)
    logger.info("File result {}".format(res))
    return res

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

    configuration = dict(
        publish=dict(
            outgoing_1=dict(
                exchange="processdata-rpc",
                exchange_type="direct",
                routing_key="processdata",
                queue="process-data-finished",
                durable=True,
                auto_delete=False,
                prefetch_count=1
            )
        ),
        receive=dict(
            incoming=dict(
                exchange="processdata-rpc",
                exchange_type="direct",
                routing_key="processdata",
                queue="process-data-comming",
                durable=True,
                auto_delete=False,
                prefetch_count=1
            )
        )
    )

    # Using Tornado IO Loop
    io_loop = tornado.ioloop.IOLoop.current()
    rabbit_connection = TornadoAdapter(rabbitmq_url=RABBIT_URI, configuration=configuration, io_loop=io_loop)
    rabbit_connection.receive(handler=handle_message, queue=configuration["receive"]["incoming"]["queue"])
    io_loop.start()