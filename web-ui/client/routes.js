import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

/*
Planned routes are...

/welcome
/browse/_orgaId/
/browse/_orgaId/_sourceId/

/browse/sources/
/browse/sources/_sourceId/edit
/browse/organizations/_orgaId/
/browse/organizations/_orgaId/sources ???

/manage/organizations/create
/manage/organizations/_orgaId_    <- includes link to delete
/manage/organizations/_orgaId_/edit

/manage/organizations/_orgaId/sources/create

/manage/sources/_sourceId

/manage/sources/_sourceId/format
/manage/sources/_sourceId/settings
/manage/sources/_sourceId/imports/_importId
/manage/sources/_sourceId/imports/_importId
/manage/sources/_sourceId/access

/help
/signup
/signin
/forgot-password
/reset-password
/terms-of-service/organizations
/terms-of-service/people
/press
/imprint
*/

function checkLoggedIn (ctx, redirect) {
  if (!Meteor.userId()) {
    redirect('/');
  }
}

function redirectIfLoggedIn (ctx, redirect) {
  if (Meteor.userId()) {
    redirect('/dashboard');
  }
}


FlowRouter.route('/', {
  action() {
    if (Meteor.userId()) {
      BlazeLayout.render('app_layout_with_header', {
        main: 'page_dashboard',
        header_navigation_list: 'dashboard_header_navigation' });
    } else {
      BlazeLayout.render('app_layout_start_page', { main: 'page_start' });
    }
  },
});

// ---- Organizations ------------------------------
FlowRouter.route('/organizations', {
  name: 'organizations.list',
  action() {
    BlazeLayout.render('app_layout_with_header', {
      main: 'page_orgas_list',
      header_navigation_list: 'home_header_navigation' });
  },
});

FlowRouter.route('/organizations/:_id', {
  name: 'organizations.show',
  action() {
    BlazeLayout.render('app_layout_with_header', {
      main: 'organizations_show_page',
      header_navigation_list: 'organizations_show_page_header_navigation' });
  },
});

// ========= MANAGE =======================================================

const manageRoutes = FlowRouter.group({
  name: 'manage',
  prefix: '/manage',
  triggersEnter: [
    checkLoggedIn,
  ],
});

manageRoutes.route('/organizations', {
  name: 'manage.organizations.list',

  action() {
    BlazeLayout.render('app_layout_with_header', {
      main: 'organizations_list_page',
      header_navigation_list: 'home_header_navigation' });
  },
});

manageRoutes.route('/organizations/create', {
  name: 'manage.organizations.create',
  action() {
    BlazeLayout.render('app_layout_with_header', {
      main: 'organizations_create_page',
      // header_navigation_list: 'home_header_navigation',
    });
  },
});

manageRoutes.route('/organizations/:_id', {
  name: 'manage.organizations.show',
  action() {
    BlazeLayout.render('app_layout_with_header', {
      main: 'organizations_show_page',
      header_navigation_list: 'organizations_show_header',
    });
  },
});


manageRoutes.route('/organizations/:_id/sources', {
  name: 'manage.organizations.sources.list',
  action() {
    BlazeLayout.render('app_layout_with_header', {
      main: 'organizations_show_page',
      header_navigation_list: 'organizations_show_header',
    });
  },
});

manageRoutes.route('/organizations/:_id/sources/create', {
  name: 'manage.organizations.sources.create',
  action() {
    BlazeLayout.render('app_layout_with_header', {
      main: 'sources_create_page',
      header_navigation_list: 'sources_create_header',
    });
  },
});

// === NOT FOUND ===================================


// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
