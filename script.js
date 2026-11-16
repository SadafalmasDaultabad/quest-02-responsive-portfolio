(function () {
    var STORAGE_KEY = 'theme';
    var root = document.documentElement;

    function getInitialTheme() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved === 'light' || saved === 'dark') {
                return saved;
            }
        } catch (error) {
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);

        var button = document.querySelector('.theme-toggle');
        if (button) {
            button.setAttribute('aria-pressed', String(theme === 'dark'));
        }
    }

    applyTheme(getInitialTheme());

    document.addEventListener('DOMContentLoaded', function () {
        var button = document.querySelector('.theme-toggle');
        if (!button) {
            return;
        }

        applyTheme(root.getAttribute('data-theme'));

        button.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);

            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch (error) {
            }
        });
    });
})();
