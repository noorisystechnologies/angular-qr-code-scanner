import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, VERSION, ViewChild } from '@angular/core';
// import { OwlOptions } from 'ngx-owl-carousel-o';
// import * as chartData from '../../../shared/data/dashboard';
// import * as chartData1 from '../../../shared/data/chart/chartjs';
// import { AdminApiService } from '../shared/admin-api.service';
// import { AuthService } from 'src/app/shared/services/auth.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Role } from 'src/app/shared/models/role';
// import { PieChartData } from 'src/app/shared/services/pie-chart';
// import { ApexRandomData } from 'src/app/shared/services/daily-report-chart';

import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BarcodeFormat, Result } from '@zxing/library';
// import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject, Subject } from 'rxjs'
import Swal from 'sweetalert2';
// import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
declare var MediaRecorder: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'QRCode';
  

  // customOptions!: OwlOptions

	availableDevices: MediaDeviceInfo[];
	deviceCurrent: MediaDeviceInfo = null;
	deviceSelected: string;

	@ViewChild('next', { static: true }) next: ElementRef;
	@ViewChild('openDownloadModal', { static: true }) openDownloadModal: ElementRef;
	@ViewChild('openDownloadModalSafari', { static: true }) openDownloadModalSafari: ElementRef;
	@ViewChild('openStepOneHintModal', { static: true }) openStepOneHintModal: ElementRef;
	@Output('parentFun') parentFun: EventEmitter<any> = new EventEmitter();
	@Output('stepOne') stepOne: EventEmitter<any> = new EventEmitter();
	@Output('stepThree') stepThree: EventEmitter<any> = new EventEmitter();
	@Output('stepFour') stepFour: EventEmitter<any> = new EventEmitter();
	@Output('stepSix') stepSix: EventEmitter<any> = new EventEmitter();
	@ViewChild(ZXingScannerComponent, { static: false }) scanner: ZXingScannerComponent;

	hasDevices: boolean;
	hasPermission: boolean;
	qrResultString: string;
	torchEnabled = false;
	torchAvailable$ = new BehaviorSubject<boolean>(false);
	tryHarder = false;
	// firstForm: FormGroup;
	readonly imageTrigger: Subject<void> = new Subject<void>();
	deviceInfo = null;
	browserVersion
	isQRCodeModal = false;

	allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];
  constructor(	
		private deviceService: DeviceDetectorService,){

  }
  public openModel(qrCodeModal) {
		// this.modalService.open(qrCodeModal)
		this.isQRCodeModal = true;
		// this.openQRCode(qrCodeModal)
		// this.next.nativeElement.click();
		// qrCodeModal.hide();
		// this.stepOne.emit(false);
		// this.stepThree.emit(false);
		// this.stepFour.emit(false);
		// this.stepSix.emit(false);
	}
	onCamerasFound(devices: MediaDeviceInfo[]) {
		this.availableDevices = devices;
		this.hasDevices = Boolean(devices && devices.length);
	}
  onCodeResult(resultString: string) {
		this.qrResultString = resultString;
		this.deviceCurrent = null;
		console.log(this.qrResultString);
	}
  onDeviceSelectChange(selected: string) {
		const selectedStr = selected || '';
		if (this.deviceSelected === selectedStr) { return; }
		this.deviceSelected = selectedStr;
		const device = this.availableDevices.find(x => x.deviceId === selected);
		this.deviceCurrent = device || null;
	}
  onDeviceChange(device: MediaDeviceInfo) {
		const selectedStr = (device && device.deviceId) ? device.deviceId : '';
		if (this.deviceSelected === selectedStr) { return; }
		this.deviceSelected = selectedStr;
		this.deviceCurrent = device || null;
	}
  onHasPermission(has: boolean) {
		this.deviceInfo = this.deviceService.getDeviceInfo();
		this.hasPermission = has;
		if (this.hasPermission === false) {
			Swal.fire({
				icon: 'error',
				title: 'Oops!',
				html: 'It seems that you disable the camera permission. Kindly allow the browser to use the camera. <br/> <b>Detail:</b>' + " " + 'Permission denied',
				confirmButtonColor: '#064572',
				confirmButtonText: 'OK'
			});
		}
		if (navigator.mediaDevices.getUserMedia == undefined) {
			console.log('Your browser does not support navigator.mediaDevices.getUserMedia');
			console.log(this.deviceInfo);
			this.browserVersion = this.deviceInfo.browser_version;
			console.log(this.browserVersion);
			if (this.deviceInfo.os == "iOS" && this.deviceInfo.browser == "Chrome") {
				setTimeout(() => {
					this.openDownloadModal.nativeElement.click();
				}, 200)
			}
			// For Safari
			if (this.deviceInfo.os == "iOS" && this.deviceInfo.browser == "Safari") {
				setTimeout(() => {
					this.openDownloadModalSafari.nativeElement.click();
				}, 200)
			}
		}
  }
}
