import { Http } from '@angular/http';
import { 
    Injectable,
    Inject,
} from '@angular/core';
import { APP_CONFIG, IConfig } from './app.config';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface IPhoto {
    id: string,
    image: string,
};

export interface IProfile {
    id: string,
    image: string,
    name: string,
};

export interface ICardAlias {
    id: string,
    number: string,
    alias: string,
    // type: "visa" | "mastercard",
};

export interface IPayment {
    profileId: string,
    pin: string,
    amount: number,
    alias: string,
};

@Injectable()
export class UsersService {
    constructor(private http: Http, @Inject(APP_CONFIG) private config: IConfig) {}

    getPhotos(): Observable<IPhoto[]> {
        const { apiHost, cameraId } = this.config;

        return this.http.get(`${apiHost}/photos?cameraId=${cameraId}`)
            .pipe(map(response => response.json()))
            .pipe(map(response => response.photos))
            .pipe(switchMap((photos): Promise<IPhoto[]> => {
                return Promise.all(
                    photos.map(async (photo): Promise<IPhoto> => {
                        const photoFile = await fetch(`data:image/jpg;base64,${photo.base64Photo}`);
                        return {
                            id: `${photo.photoId}`,
                            image: URL.createObjectURL(await photoFile.blob()),
                        };
                    })
                ) as any;
		    }));
    }

    getProfiles(photoId: string): Observable<IProfile[]> {
        const { apiHost } = this.config;

        return this.http.get(`${apiHost}/profiles?photoId=${photoId}`)
            .pipe(map(response => response.json()))
            .pipe(map(response => response.profiles))
            .pipe(switchMap((photos): Promise<IProfile[]> => {
                return Promise.all(
                    photos.map(async (profile): Promise<IProfile> => {
                        const photoFile = await fetch(`data:image/jpg;base64,${profile.base64Photo}`);
                        return {
                            id: `${profile.id}`,
                            image: URL.createObjectURL(await photoFile.blob()),
                            name: profile.name,
                        };
                    })
                ) as any;
		    }));
    }

     getCardAliases(profileId: string): Observable<ICardAlias[]> {
        const { apiHost } = this.config;

        return this.http.get(`${apiHost}/payments/cards?profileId=${profileId}`)
            .pipe(map(response => response.json()))
            .pipe(map(response => response.cards))
            .pipe(map((aliases: any[]): ICardAlias[] => {
                return aliases.map((alias): ICardAlias => ({
                    id: alias.uid,
                    number: alias.mask, 
                    alias: alias.alias,
                }));
		    }));
    }

    submitPayment(payment: IPayment) {
        const { apiHost } = this.config;

        return this.http
            .post(`${apiHost}/payments`, payment);
    }
}

