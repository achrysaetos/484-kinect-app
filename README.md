# README
Simple drawing app. Demo vid here: https://youtu.be/_1G5D871B5Q
1. Run the playback in the recorder repo (create local server)
2. Open index.html in this repo
3. Open http://127.0.0.1:4444/ in another tab

## Sources
Docs here: https://cpsc484-584-hci.gitlab.io/s23/display_tutorial/ \
Enable playback: https://github.com/Yale-CPSC484-HCI/recorder
* Record: `pipenv run python src/main.py --websocket-server cpsc484-03.yale.internal:8888 --data-path data/sample3 --mode record`
* Playback: `pipenv run python src/main.py --data-path data/sample3 --mode play`