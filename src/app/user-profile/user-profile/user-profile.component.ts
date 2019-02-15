/**
 * @author- Shahbaz Shaikh
 * @description - user profile are the update the logged in user profile
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// ----------------------------------------------------- //
import { UserProfileService } from '../user-profile.service';
import { UserProfile } from '../user-profile.model';


@Component({
  selector: 'ims-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  /**
   * Declare variable
   */
  public userProfiles: UserProfile;
  public userProfileForm: FormGroup;
  public id: number;
  /**
   * Declare variable for regular expression
   */
  public nameRegEx: string;
  public emailRegEx: string;
  public numberRegEx: string;

  /**
   * Inject the service
   */
  constructor(private service: UserProfileService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    this.userProfiles = new UserProfile();
    // Define variable for regular expression
    this.nameRegEx = '[a-zA-Z][a-zA-Z ]+[a-zA-Z]$';
    this.emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
    this.numberRegEx = '^[0-9]+$';
  }

  ngOnInit() {
    this.updateDetails();
    this.updateSettings();
    this.userProfileForm.get('password').valueChanges.subscribe(val => {
      this.validatePassword(val);
    });
  }

  /**
   * update deatils for user profile form using reactive forms
   */
  public updateDetails() {
    this.userProfileForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern(this.nameRegEx)]],
      title: [{ value: '', disabled: true }],
      email: ['', [Validators.pattern(this.emailRegEx)]],
      mobile_number: ['', [Validators.pattern(this.numberRegEx), Validators.maxLength(10)]],
      password: ['', [Validators.required]],
      new_password: [{ value: '', disabled: true }, [Validators.required]],
      retype_password: [{ value: '', disabled: true }, [Validators.required]]
    },
      {
        validator: UserProfileComponent.MatchPassword
      });
  }

  /**
   * update setting in patch the existing logged in user value
   */
  public updateSettings(): void {
    const loginUser = localStorage.getItem('token');
    this.service.getUserByEmail(loginUser)
      .subscribe((userProfile) => {
        this.userProfiles = userProfile,
          this.userProfileForm.patchValue({
            id: this.userProfiles[0].id,
            name: this.userProfiles[0].name,
            title: this.userProfiles[0].title,
            email: this.userProfiles[0].email,
            mobile_number: this.userProfiles[0].mobile_number,
            // password: this.userProfiles[0].password
          });
      });
  }

  /**
   * onsubmit method are update the records on server
   */
  public onSubmit(): void {
    const userProfile: UserProfile = new UserProfile();
    userProfile.id = this.userProfileForm.get('id').value;
    userProfile.email = this.userProfileForm.get('email').value;
    userProfile.mobile_number = this.userProfileForm.get('mobile_number').value;
    userProfile.name = this.userProfileForm.get('name').value;
    userProfile.password = this.userProfileForm.get('new_password').value;
    if (window.confirm('Are sure you want to update records ?')) {
      this.service.updateUserProfile(userProfile).subscribe(obj => {
        localStorage.setItem('token', userProfile.email);
      });
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  /**
   * validationPassword are used to check the old password
   * if old password match so enable the new password and retype password filed
   */
  private validatePassword(val) {
    if (this.userProfiles[0].password === val) {
      this.userProfileForm.get('new_password').enable();
      this.userProfileForm.get('retype_password').enable();
    } else {
      this.userProfileForm.get('new_password').disable();
      this.userProfileForm.get('retype_password').disable();
    }
  }


  /**
   * MatchPassword field are to check the new password and retype password field
   */
  // tslint:disable-next-line:member-ordering
  static MatchPassword(ac: AbstractControl) {
    const newPassword = ac.get('new_password').value;
    const confirmPassword = ac.get('retype_password').value;
    if (newPassword !== confirmPassword) {
      ac.get('retype_password').setErrors({ notmatch: true });
    } else {
      ac.get('retype_password').setErrors(null);
    }
  }

}
