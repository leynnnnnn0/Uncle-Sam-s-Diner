<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <style>
        @page {
            margin: 0;
            padding: 0;
            size: letter portrait;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body { 
            font-family: BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        
        .page-container {
            width: 100%;
            min-height: 100vh;
            page-break-after: avoid;
            page-break-inside: avoid;
            position: relative;
        }
        
        .background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            z-index: 1;
        }
        
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.8);
            z-index: 2;
        }
        
        .content {
            position: relative;
            z-index: 3;
            padding: 60px;
            min-height: 100vh;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .heading {
            font-size: 72px;
            font-style: italic;
            font-family: serif;
            margin-bottom: 20px;
            line-height: 1.2;
        }
        
        .subheading {
            font-size: 24px;
            margin-bottom: 50px;
            line-height: 1.6;
        }
        
        .qr-container {
            width: 320px;
            height: 320px;
            background-color: white;
            padding: 16px;
            margin: 0 auto 50px;
            border: 3px solid #e5e7eb;
        }
        
        .qr-container img {
            width: 100%;
            height: 100%;
            display: block;
        }
        
        .qr-placeholder {
            width: 100%;
            height: 100%;
            background-color: #d1d5db;
            text-align: center;
            padding-top: 140px;
        }
        
        .qr-placeholder-text {
            font-size: 20px;
            color: #4b5563;
        }
        
        .logo-container {
            width: 250px;
            height: 200px;
            margin: 0 auto;
            text-align: center;
        }
        
        .logo-container img {
            max-width: 100%;
            max-height: 100%;
            display: inline-block;
        }
        
        .logo-placeholder {
            padding-top: 60px;
            font-weight: bold;
            font-size: 32px;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <div class="page-container" style="background-color: {{ $backgroundColor }};">
        
        @if(isset($backgroundImageBase64))
            <div class="background" style="background-image: url('{{ $backgroundImageBase64 }}');"></div>
            <div class="overlay"></div>
        @endif
        
        <div class="content">
            
            <!-- Heading -->
            <h1 class="heading" style="color: {{ $textColor }};">
                {{ $heading }}
            </h1>

            <!-- Subheading -->
            <p class="subheading" style="color: {{ $textColor }};">
                {{ $subheading }}
            </p>

            <!-- QR Code -->
            <div class="qr-container">
                @if(isset($qrCodeBase64))
                    <img src="{{ $qrCodeBase64 }}" alt="QR Code">
                @else
                    <div class="qr-placeholder">
                        <div class="qr-placeholder-text">QR Code Preview</div>
                    </div>
                @endif
            </div>

            <!-- Logo -->
            <div class="logo-container">
                @if(isset($logoBase64))
                    <img src="{{ $logoBase64 }}" alt="Logo">
                @else
                    <div class="logo-placeholder" style="color: {{ $textColor }};">
                        <div>YOUR</div>
                        <div>LOGO</div>
                    </div>
                @endif
            </div>
        </div>
    </div>
</body>
</html>