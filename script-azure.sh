apt update
sleep 1
apt upgrade -y
sleep 1
apt-get install python3 -y
sleep 1
apt-get install python3-pip -y
sleep 1
cd ..
sleep 1
cd ..
sleep 1
git clone https://github.com/m-wrzr/populartimes.git
sleep 1
cd populartimes
sleep 1
pip3 install --upgrade setuptools
sleep 1
pip3 install .
