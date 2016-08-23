__author__ = 'kjwook'

# The slug of the panel to be added to HORIZON_CONFIG. Required.
PANEL = 'policy'
# The slug of the panel group the PANEL is associated with.
PANEL_GROUP = 'oasis-group'
# The slug of the dashboard the PANEL associated with. Required.
PANEL_DASHBOARD = 'project'

# Python panel class of the PANEL to be added.
ADD_PANEL = 'oasis_dashboard.content.policy.panel.Policy'