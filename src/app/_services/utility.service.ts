import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  copyText = 'Link copied to your clipboard';

  constructor(
    private toast: ToastController
  ) { }

  /**
   * If navigator API is not supported
   * @param text Text to be copied
   */
  fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand("copy");
      if (successful) {
        this.presentToast(this.copyText);
      }
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }
    document.body.removeChild(textArea);
  }

  /**
   * Method to copy a certain text with url or without either one
   * @param link string of url - optional
   * @param text string of any text - optional
   * @returns nothing
   */
  copyToClipboard(link?: string, text?: string) {
    const str = `${text} ${link}`;
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(str);
      return;
    }
    navigator.clipboard.writeText(str)
      .then(() => this.presentToast(this.copyText))
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  paginate(items, pageno, per_page) {
    var page = pageno,
      per_page = per_page,
      offset = (page - 1) * per_page,
      paginatedItems = items.slice(offset).slice(0, per_page),
      total_pages = Math.ceil(items.length / per_page);
    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: (total_pages > page) ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems
    };
  }

}
