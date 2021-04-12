import os.path
import pandas as pd
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow

from google.oauth2 import service_account

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SERVICE_ACCOUNT_FILE = '/home/matheusmercadante/Documentos/PROJETOS/csv-automation/processdata/processdata/config/token.json'

creds = None
creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES
)

def pull_sheet_data(fileId, dataToPull):
  service = build('sheets', 'v4', credentials=creds)

  # Call the Sheets API
  sheet = service.spreadsheets()
  result = sheet.values().get(spreadsheetId=fileId, range=dataToPull).execute()
  values = result.get('values', [])

  if not values:
      return 'No data found.'
  else:
      rows = sheet.values().get(spreadsheetId=fileId,
                                range=dataToPull).execute()
      data = rows.get('values')
      print("COMPLETE: Data copied")
      return data


def read_sheet(file):
    """Shows basic usage of the Sheets API.
    Prints values from a sample spreadsheet.
    """
    # The ID spreadsheet.
    SAMPLE_SPREADSHEET_ID = '1NxhqonJ1NBKiL4GYhWmeV8vlR-l_MgUcqgDZUC8jM_Q'
    DATA_TO_PULL = 'sales'

    data = pull_sheet_data(SAMPLE_SPREADSHEET_ID, DATA_TO_PULL)

    df = pd.DataFrame(data[1:], columns=data[0])
    return df
    
