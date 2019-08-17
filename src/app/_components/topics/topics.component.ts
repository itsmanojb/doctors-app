import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import Topics from '../../../assets/dummy/topics.json';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {

  allTopics: any[] = [];
  sampleTopics = Topics;
  selectedTopics: string[] = [];
  topicNames: string[] = [];
  dataLoading = true;
  dataErr: boolean;
  noTopics: boolean;
  dataSubmitted: boolean;
  hasSelected = false;

  constructor(
    private modal: ModalController,
  ) {}

  ngOnInit() {
    this.getAllTopics()
  }

  getAllTopics() {
    this.dataLoading = true;
    setTimeout(() => {
      this.dataLoading = false;
      this.allTopics = this.sampleTopics;
    }, 1000);
  }

  selectTopic(topic: any, selected: boolean) {
    if (this.selectedTopics.includes(topic)) {
      if (!selected) {
        this.selectedTopics = this.selectedTopics.filter(e => e !== topic);
      }
    } else {
      this.selectedTopics.push(topic);
    }
    this.hasSelected = this.selectedTopics.length === 0 ? false : true;
  }

  checkSelected(id: string) {
    if (this.selectedTopics.includes(id)) {
      return true;
    }
    return false;
  }

  minimumText(txt: string): string {
    let str = txt.split('(')[0];
    str = str.split('/')[0];
    return str;
  }

  cancel() {
    this.modal.dismiss(null);
  }

  save(): any {
    this.dataSubmitted = true;
    setTimeout(() => {
      this.dataSubmitted = false;
      this.modal.dismiss('Topics has been updated.', 'updated');
    }, 500);
  }

}
