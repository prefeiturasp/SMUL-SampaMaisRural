$(document).ready(function() {
    $("#seals_group_connected_partner_ids_input").hide();
    listenSelect();
});

function listenSelect() {
    $("#partner-select").on('select2:select', function (e) {
        console.log('dssd')
        const data = e.params.data;
        if (data.selected) {
            $.ajax({
                url: "/admin/partners/" + data.id + "/connections"
            }).done(function(connected_partners) {
                if (connected_partners.length) {
                    $('#seals_group_connected_partner_ids_input .choices .choices-group').html('');
                    $("#seals_group_connected_partner_ids_input").show();
                    selectConnectedPartners(connected_partners);
                }
            })
        }
    });
}

function selectConnectedPartners(connected_partners) {
    connected_partners.map((partner) => addConnectedPartnerCheckbox(partner));
}

function addConnectedPartnerCheckbox(partner) {
    const ol = $('#seals_group_connected_partner_ids_input .choices .choices-group')[0];
    const li = document.createElement('li')
    li.classList = "choice";
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "seals_group[connected_partner_ids][]";
    checkbox.id = ("seals_group_connected_partner_ids_" + partner.id);
    checkbox.value = partner.id;
    const label = document.createElement('label');
    const tn = document.createTextNode(partner.name);
    label.htmlFor=("seals_group_connected_partner_ids_" + partner.id);

    label.appendChild(checkbox);
    label.appendChild(tn);
    li.appendChild(label);
    ol.appendChild(li);
}
