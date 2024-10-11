from datetime import datetime

def save_logs(path, type, content):
    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_name = f"log_{type}_{current_time}.txt"

    with open(path+file_name, 'w') as log_file:
        log_file.write(content)