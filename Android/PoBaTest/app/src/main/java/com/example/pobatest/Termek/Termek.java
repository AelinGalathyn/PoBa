package com.example.pobatest.Termek;

import android.os.Parcel;
import android.os.Parcelable;

import androidx.annotation.NonNull;

import com.example.pobatest.R;

import java.util.ArrayList;

public class Termek implements Parcelable {
    String termekId;
    String termekNeve;
    int image;
    int darab_imge;
    int darabSzam;
    ArrayList<String> adatok;

    public Termek(String termekId, String termekNeve, int darabSzam) {
        this.termekId = termekId;
        this.termekNeve = termekNeve;
        this.image = R.drawable.ideiglenes_termek_kep;

        if (darabSzam == 0) {
            this.darab_imge = R.drawable.elfogyott_icon;
        }
        else if (darabSzam <= 5 && darabSzam > 0){
            this.darab_imge = R.drawable.kifogyoban_icon;
        }
        else {
            this.darab_imge = 0;
        }

        this.darabSzam = darabSzam;
        adatok = new ArrayList<>();
    }

    protected Termek(Parcel in) {
        termekId = in.readString();
        termekNeve = in.readString();
        image = in.readInt();
        darab_imge = in.readInt();
        darabSzam = in.readInt();
        adatok = in.createStringArrayList();
    }

    public static final Creator<Termek> CREATOR = new Creator<Termek>() {
        @Override
        public Termek createFromParcel(Parcel in) {
            return new Termek(in);
        }

        @Override
        public Termek[] newArray(int size) {
            return new Termek[size];
        }
    };

    public String getTermekId() {
        return termekId;
    }

    public String getTermekNeve() {
        return termekNeve;
    }

    public int getImage() {
        return image;
    }

    public void setImage(int image) {
        this.image = image;
    }

    public int getDarabSzam() {
        return darabSzam;
    }

    public ArrayList<String> getAdatok() {
        return adatok;
    }

    public void setAdatok(ArrayList<String> adatok) {
        this.adatok = adatok;
    }

    public void setDarabSzam(int darabSzam) {
        this.darabSzam = darabSzam;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(@NonNull Parcel dest, int flags) {
        dest.writeString(this.termekId);
        dest.writeString(this.termekNeve);
        dest.writeInt(this.image);
        dest.writeInt(this.darab_imge);
        dest.writeInt(this.darabSzam);
        dest.writeStringList(this.adatok);
    }
}
