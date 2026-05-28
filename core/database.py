import os
import boto3
from botocore.auth import SigV4Auth
from botocore.awsrequest import AWSRequest
from gremlin_python.driver.driver_remote_connection import DriverRemoteConnection
from gremlin_python.process.anonymous_traversal import traversal
from dotenv import load_dotenv


load_dotenv()
# ATENÇÃO: Substitua pelo endpoint real e a região do seu banco
NEPTUNE_ENDPOINT = os.getenv('NEPTUNE_ENDPOINT')
PORT = os.getenv('NEPTUNE_PORT', '8182')
REGION = os.getenv('AWS_REGION', 'us-east-1') 

def get_signed_headers():
    session = boto3.Session()
    credentials = session.get_credentials().get_frozen_credentials()

    url = f"wss://{NEPTUNE_ENDPOINT}:{PORT}/gremlin"
    request = AWSRequest(method='GET', url=url)
    
    SigV4Auth(credentials, 'neptune-db', REGION).add_auth(request)
    return dict(request.headers)

def get_graph_traversal():
    headers = get_signed_headers()
    ws_url = f"wss://{NEPTUNE_ENDPOINT}:{PORT}/gremlin"

    # CORREÇÃO AQUI: Removemos o transport_kwargs e passamos headers direto
    connection = DriverRemoteConnection(
        ws_url, 
        'g',
        headers=headers 
    )
    
    g = traversal().withRemote(connection)
    return g, connection