document.addEventListener('DOMContentLoaded', function() {
    const tabGroups = {
        group1: {
            tabs: document.querySelectorAll('#tab-button-A, #tab-button-B'),
            panels: document.querySelectorAll('#tab-A, #tab-B')
        },
        group2: {
            tabs: document.querySelectorAll('#tab-button-C, #tab-button-D'),
            panels: document.querySelectorAll('#tab-C, #tab-D')
        }
    };

    Object.values(tabGroups).forEach(group => {
        group.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Hide all tab panels in the current group
                group.panels.forEach(panel => {
                    panel.hidden = true;
                });

                // Remove 'aria-selected' from all tabs in the current group
                group.tabs.forEach(t => {
                    t.setAttribute('aria-selected', 'false');
                });

                // Show the clicked tab's panel and set it as selected
                const selectedPanel = document.getElementById(tab.getAttribute('aria-controls'));
                selectedPanel.hidden = false;
                tab.setAttribute('aria-selected', 'true');
            });
        });
    });
});
