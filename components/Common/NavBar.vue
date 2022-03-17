<template>
    <b-navbar
        toggleable="lg"
        type="dark"
        variant="info"
    >
        <b-navbar-brand
            to="/"
            no-prefetch
        >
            LinkShorter
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse
            id="nav-collapse"
            is-nav
        >
            <b-navbar-nav>
                <b-nav-item
                    to="/generate/"
                    no-prefetch
                >
                    Generate link
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
