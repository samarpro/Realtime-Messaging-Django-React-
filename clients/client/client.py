import asyncio
import websockets
import json

async def connect():
    token='d50b9d76c194a05a522623da3946d3d0c16d0dca'
    # '47a17448a7271e6fc830b18f569f7dd3d3214777'
    print("Starting out sending process")
    # Connect to the WebSocket server and pass custom headers
    websocket = await websockets.connect(f'ws://127.0.0.1:8000/SndCht/samarpangupta123456-samarpangupta1230/{token}/')
    try:
        # Send and receive data over the WebSocket connection
        text = {
            'text':"Hello, Websocket!dfsdfjhk"
        }
        await websocket.send(json.dumps(text))
        response = await websocket.recv()
        print(response)
    except Exception as e:
        print(e)
    finally:
        # Close the WebSocket connection
        await websocket.close()

asyncio.get_event_loop().run_until_complete(connect())