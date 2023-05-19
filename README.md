# Project Title

Pacmann Frontend

## Description

Aplikasi frontend sebagai interface untuk : login member, register new member, pengaturan room dan aktifitas chat.
Aplikasi terkait adalah Rakamin Backend yang dapat dilihat di link berikut : https://github.com/VictorSilalahi/rakamin-backend

## Getting Started

### Dependencies

* click==8.1.3
* colorama==0.4.6
* Flask==2.2.3
* Flask-Cors==3.0.10
* itsdangerous==2.1.2
* Jinja2==3.1.2
* MarkupSafe==2.1.2
* python-dotenv==1.0.0
* six==1.16.0
* waitress==2.1.2
* Werkzeug==2.2.3


### Executing program

* Setelah seluruh file ini di clone, masuk lah ke dalam folder aplikasi ini
* jalankan beberapa command sbb: 
```
python -m venv venv
.\venv\scripts\activate
pip install -r requirements.txt
python run.py
```

## Daftar Folder dan File

* run.py ---> file utama untuk menjalankan aplikasi
* app\login\login.py ---> file routing untuk menampilkan halaman login.html
* app\register\register.py ---> file routing untuk menampilkan halaman register.html
* app\admin\ ---> file routing untuk menampilkan halaman-halaman milik admin
* app\static\ ---> folder untuk menyimpan css, javascript dan images
* app\templates\ ---> folder untuk menyimpan halaman-halaman html


## Authors

Victor Silalahi 
https://www.linkedin.com/in/victor-silalahi-64512211a

