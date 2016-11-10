# plugin.sh - DevStack plugin.sh dispatch script oasis-dashboard

OASIS_DASHBOARD_DIR=$(cd $(dirname $BASH_SOURCE)/.. && pwd)

function install_oasis_dashboard {
    # NOTE(shu-mutou): workaround for devstack bug: 1540328
    # where devstack install 'test-requirements' but should not do it
    # for oasis-dashboard project as it installs Horizon from url.
    # Remove following two 'mv' commands when mentioned bug is fixed.
    mv $OASIS_DASHBOARD_DIR/test-requirements.txt $OASIS_DASHBOARD_DIR/_test-requirements.txt

    setup_develop ${OASIS_DASHBOARD_DIR}

    mv $OASIS_DASHBOARD_DIR/_test-requirements.txt $OASIS_DASHBOARD_DIR/test-requirements.txt
}

function configure_oasis_dashboard {
    cp -a ${OASIS_DASHBOARD_DIR}/oasis_dashboard/enabled/* ${DEST}/horizon/openstack_dashboard/local/enabled/

    local horizon_manage_py="$HORIZON_DIR/manage.py"

    python "$horizon_manage_py" collectstatic --noinput
    python "$horizon_manage_py" compress --force

    restart_apache_server
}

# check for service enabled
if is_service_enabled oasis-dashboard; then

    if [[ "$1" == "stack" && "$2" == "pre-install"  ]]; then
        # Set up system services
        # no-op
        :

    elif [[ "$1" == "stack" && "$2" == "install"  ]]; then
        # Perform installation of service source
        echo_summary "Installing Oasis Dashboard"
        install_oasis_dashboard

    elif [[ "$1" == "stack" && "$2" == "post-config"  ]]; then
        # Configure after the other layer 1 and 2 services have been configured
        echo_summary "Configurng Magnum UI"
        configure_oasis_dashboard

    elif [[ "$1" == "stack" && "$2" == "extra"  ]]; then
        # no-op
        :
    fi

    if [[ "$1" == "unstack"  ]]; then
        # no-op
        :
    fi

    if [[ "$1" == "clean"  ]]; then
        # Remove state and transient data
        # Remember clean.sh first calls unstack.sh
        # no-op
        :
    fi
fi
