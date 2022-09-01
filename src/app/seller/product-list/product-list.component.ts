import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Items } from 'src/app/help';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  items: Items[];
  items2: Items[];
  SearchText
  userEmail
  pages
  constructor(private commonService: CommonService, private _Activatedroute: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.userEmail = localStorage.getItem("email")
    this.SearchText = this._Activatedroute.snapshot.paramMap.get("brand");

    this.commonService.getItems().subscribe((data: Items[]) => {
      this.items = data;
      let cData = data;

      this.items2 = cData.filter(data => data.sellerEmail == this.userEmail)


    })

}
}
