===============================
oasis-dashboard
===============================

Oasis Dashboard

* Free software: Apache license
* Source: https://github.com/iBluemind/oasis-dashboard
* Bugs: https://github.com/iBluemind/oasis-dashboard

Enabling in DevStack
--------------------

Add this repo as an external repository into your ``local.conf`` file::

    [[local|localrc]]
    enable_plugin oasis-dashboard https://github.com/samgoon/oasis-dashboard

Manual Installation
-------------------

Install Oasis Dashboard::

    sudo pip install -e oasis-dashboard
    
    
And enable it in Horizon::

    ln /oasis-dashboard/oasis_dashboard/enabled /horizon/openstack-dashboard/local/enabled/

(If offline compression is enabled - typical in production and devstack). Django has a compressor feature that performs many enhancements for the delivery of static files. It can be enable or disabled (COMPRESS_ENABLED). In addition, offline compression may be enabled or disabled (COMPRESS_OFFLINE = True). If offline compression is enabled in your environment, you must run the following commands the first time you install searchlight-ui and anytime you make changes to it.::

    tools/with_venv.sh ./manage.py collectstatic
    tools/with_venv.sh ./manage.py compress
    sudo service apache2 restart
