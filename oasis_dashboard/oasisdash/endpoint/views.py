# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

from horizon import tabs

from oasis_dashboard.oasisdash.function import tabs as function_tabs
from django.core.urlresolvers import reverse_lazy
from django.utils.translation import ugettext_lazy as _
from oasis_dashboard.api import oasis

from horizon import exceptions
from horizon import forms
from oasis_dashboard.api import oasis
from horizon import views

import logging

LOG = logging.getLogger(__name__)


from django.core.urlresolvers import reverse_lazy
from django.utils.translation import ugettext_lazy as _

class IndexView(views.APIView):
    template_name = "oasisdash/endpoint/index.html"
    page_title = _("Endpoint")
