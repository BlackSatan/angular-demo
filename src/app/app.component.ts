import { Component } from '@angular/core';
import { UsersService, IPhoto, IProfile, ICardAlias } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [UsersService]
})
export class AppComponent {
  private photos: IPhoto[] = [];
  private profiles: IProfile[] = [];
  private cards: ICardAlias[] = [];
  
  private selectedPhoto: IPhoto;
  private selectedProfile: IProfile;

  constructor(private usersService: UsersService) {}

  private photosSubscription;
  private profilesSubscription;
  private cardsSubscription;

  ngOnInit() {
    this.subscribe();
  }

  ngOnDestroy() {
    this.photosSubscription.unsubscribe();
    this.profilesSubscription && this.profilesSubscription.unsubscribe()
    this.cardsSubscription && this.cardsSubscription.unsubscribe()
  }

  subscribe() {
    this.photosSubscription = this.usersService.getPhotos().subscribe(photos => {
      this.photos = photos;
    });  
  }

  reload() {
    this.photosSubscription.unsubscribe();
    this.subscribe();
  }

  setSelectedPhoto(photo: IPhoto) {
    this.selectedPhoto = photo;
    this.profilesSubscription = this.usersService.getProfiles(photo.id).subscribe(profiles => {
      this.profiles = profiles;
    });
    this.selectedProfile = null;
  }

  setSelectedProfile(profile: IProfile) {
    this.selectedProfile = profile;
    this.cardsSubscription = this.usersService.getCardAliases(profile.id).subscribe(cardAliases => {
      this.cards = cardAliases;
    });
  }
}
