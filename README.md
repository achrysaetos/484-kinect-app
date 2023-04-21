# 484 - Kinect App
Scratch off app. Demo vid here: https://youtu.be/fi3AlP5jWnA
1. Run the playback in the recorder repo (create local server)
2. Open index.html in this repo
3. Open http://127.0.0.1:4444/ in another tab

## To do
1. z-pos (track many users) - done?
2. add navbars to every page
3. add +2 select options
4. qr functionality
5. google drive pics
6. test absolute positions on TV
7. add timeout/no users on screen check

## Sources
Docs here: https://cpsc484-584-hci.gitlab.io/s23/display_tutorial/ \
Enable playback: https://github.com/Yale-CPSC484-HCI/recorder
* Record: `pipenv run python src/main.py --websocket-server cpsc484-01.yale.internal:8888 --data-path data/sample1 --mode record`
* Playback: `pipenv run python src/main.py --data-path data/sample1 --mode play`