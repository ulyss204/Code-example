import { Component, OnInit, ElementRef, Directive } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AppConfig } from '../../app.config';

declare var jQuery: any;


@Component({
  selector: '[sidebar]',
  templateUrl: './sidebar.template.html'

})

export class Sidebar implements OnInit {
  $el: any;
  config: any;
  router: Router;
  location: Location;
  products:Object;
  profile:any;
  arr:any;
  id:any;
  role: any;
  name:any;

  constructor(config: AppConfig, el: ElementRef, router: Router, location: Location) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    this.router = router;
    this.location = location;


  }


  initSidebarScroll(): void {
    let $sidebarContent = this.$el.find('.js-sidebar-content');
    if (this.$el.find('.slimScrollDiv').length !== 0) {
      $sidebarContent.slimscroll({
        destroy: true
      });
    }
    $sidebarContent.slimscroll({
      height: window.innerHeight,
      size: '4px'
    });
  }

  changeActiveNavigationItem(location): void {
    let $newActiveLink = this.$el.find('a[href="#' + location.path().split('?')[0] + '"]');

    // collapse .collapse only if new and old active links belong to different .collapse
    if (!$newActiveLink.is('.active > .collapse > li > a')) {
      this.$el.find('.active .active').closest('.collapse').collapse('hide');
    }
    this.$el.find('.sidebar-nav .active').removeClass('active');

    $newActiveLink.closest('li').addClass('active')
      .parents('li').addClass('active');

    // uncollapse parent
    $newActiveLink.closest('.collapse').addClass('in').css('height', '')
      .siblings('a[data-toggle=collapse]').removeClass('collapsed');
  }

  ngAfterViewInit(): void {
    this.changeActiveNavigationItem(this.location);

  }

  ngOnInit(): void {
    //this.role = 1;
    //setTimeout(()=>{
    this.products = JSON.parse(localStorage.getItem('product'));
    this.role = JSON.parse(localStorage.getItem('profile')).role.id;
    this.name = JSON.parse(localStorage.getItem('profile')).name;


    jQuery(window).on('sn:resize', this.initSidebarScroll.bind(this));
    this.initSidebarScroll();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeActiveNavigationItem(this.location);
        if (jQuery('layout').is('.nav-collapsed')) {
          jQuery('.js-sidebar-content').find('.sidebar-nav').removeClass('open');
        }
      }
    });
  }
}
