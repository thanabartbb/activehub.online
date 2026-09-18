"use strict";
/* Screen navigation switcher with smooth cross-fade */
function switchScreen(screenId) {
    const allScreens = document.querySelectorAll('.screen-view');
    const target = document.getElementById('screen-' + screenId);
    allScreens.forEach(el => {
        if (el !== target && !el.classList.contains('hidden')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(6px) scale(0.99)';
            setTimeout(() => {
                el.classList.add('hidden');
                el.classList.remove('flex');
            }, 240);
        }
    });
    if (target) {
        setTimeout(() => {
            target.classList.remove('hidden');
            target.classList.add('flex');
            target.style.opacity = '0';
            target.style.transform = 'translateY(8px) scale(0.99)';
            requestAnimationFrame(() => {
                setTimeout(() => {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0) scale(1)';
                }, 30);
            });
        }, 160);
    }
    // Manage bottom navigation bar visibility with smooth delay
    const bottomNav = document.getElementById('bottom-nav-bar');
    if (screenId === 'home' || screenId === 'projects') {
        bottomNav.classList.remove('hidden');
        bottomNav.classList.add('flex');
        updateBottomNavTabs(screenId);
    }
    else {
        bottomNav.classList.add('hidden');
        bottomNav.classList.remove('flex');
    }
}
/* Update Bottom Bar active indicators */
function updateBottomNavTabs(screenId) {
    const homeTab = document.getElementById('tab-home');
    const projTab = document.getElementById('tab-projects');
    homeTab.className = "nav-tab-item flex flex-col items-center justify-center text-zinc-500 hover:text-zinc-300 relative";
    projTab.className = "nav-tab-item flex flex-col items-center justify-center text-zinc-500 hover:text-zinc-300 relative";
    homeTab.querySelector('.nav-indicator').className = "nav-indicator hidden w-1.5 h-1.5 bg-white rounded-full mt-0.5";
    projTab.querySelector('.nav-indicator').className = "nav-indicator hidden w-1.5 h-1.5 bg-white rounded-full mt-0.5";
    if (screenId === 'home') {
        homeTab.className = "nav-tab-item flex flex-col items-center justify-center text-white relative";
        homeTab.querySelector('.nav-indicator').className = "nav-indicator w-3.5 h-0.5 bg-white rounded-full mt-0.5";
    }
    else if (screenId === 'projects') {
        projTab.className = "nav-tab-item flex flex-col items-center justify-center text-white relative";
        projTab.querySelector('.nav-indicator').className = "nav-indicator w-1.5 h-1.5 bg-white rounded-full mt-0.5";
    }
}
/* Filter project category pills */
function setProjectFilter(btn, filterType) {
    document.querySelectorAll('.project-filter-pill').forEach(pill => {
        pill.className = "project-filter-pill px-4 py-1.5 rounded-full text-xs font-semibold bg-[#141518] text-zinc-400 border border-zinc-800 hover:text-white shrink-0 transition";
    });
    btn.className = "project-filter-pill px-4 py-1.5 rounded-full text-xs font-semibold bg-gold-300 text-black shrink-0 transition";
    showToast('Filtered: ' + filterType.toUpperCase());
}
/* Select specific service to inspect in detail screen */
function selectService(name, endpoint, type, desc, dotColor) {
    const titleEl = document.getElementById('detail-title');
    const endpointEl = document.getElementById('detail-endpoint');
    const descEl = document.getElementById('detail-desc');
    const runTextEl = document.getElementById('detail-run-text');
    if (titleEl)
        titleEl.textContent = name;
    if (endpointEl)
        endpointEl.textContent = endpoint;
    if (descEl)
        descEl.textContent = desc;
    if (runTextEl)
        runTextEl.textContent = 'Run ' + name + ' Agent';
    switchScreen('detail');
}
/* Connect Repository Modal Handlers */
function showConnectModal() {
    const modal = document.getElementById('connect-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}
function hideConnectModal() {
    const modal = document.getElementById('connect-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}
function simulateConnect(provider) {
    hideConnectModal();
    showToast('Opening ' + provider + ' authorization handshake...');
}
/* Sign In / Login Modal Controllers */
function showLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}
function hideLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}
function simulateLogin(provider) {
    hideLoginModal();
    showToast('Signing in with ' + provider + '...');
    setTimeout(() => switchScreen('home'), 900);
}
/* Dedicated Right Drawer Controllers */
function openRightDrawer() {
    const overlay = document.getElementById('right-drawer-overlay');
    const panel = document.getElementById('right-drawer-panel');
    if (!overlay || !panel)
        return;
    overlay.classList.remove('pointer-events-none', 'opacity-0');
    overlay.classList.add('pointer-events-auto', 'opacity-100');
    panel.classList.remove('translate-x-full');
    panel.classList.add('translate-x-0');
}
function closeRightDrawer(event) {
    if (event && event.target && event.target.id !== 'right-drawer-overlay')
        return;
    const overlay = document.getElementById('right-drawer-overlay');
    const panel = document.getElementById('right-drawer-panel');
    if (!overlay || !panel)
        return;
    panel.classList.remove('translate-x-0');
    panel.classList.add('translate-x-full');
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
    setTimeout(() => {
        overlay.classList.remove('pointer-events-auto');
        overlay.classList.add('pointer-events-none');
    }, 300);
}
function toggleRightDrawer() {
    const panel = document.getElementById('right-drawer-panel');
    if (panel && panel.classList.contains('translate-x-0')) {
        closeRightDrawer();
    }
    else {
        openRightDrawer();
    }
}
/* Quick service jump from Right Drawer */
function handleDrawerServiceClick(name, endpoint) {
    closeRightDrawer();
    showToast('Navigating to ' + name + '...');
    selectService(name, endpoint, 'Edge Service', 'Configured runtime agent for ' + name, '#A8B86A');
}
/* Trigger run agent simulation */
function triggerRunAgent() {
    showToast('⚡ Agent executing workflow in sandbox...');
}
/* Toast notification helper */
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toast');
    const text = document.getElementById('toast-text');
    text.textContent = message;
    clearTimeout(toastTimeout);
    toast.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');
    toastTimeout = setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
    }, 2600);
}
