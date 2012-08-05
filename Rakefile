require 'rubygems'
require 'closure-compiler'

task :default => :rallyapp

desc "Build BDC into a Rally compatible app"
task :rallyapp => :cocos_make do
	js_root = './build/bdc'
	js_files = ["#{js_root}/jah.js", "#{js_root}/cocos2d.js", "#{js_root}/bdc.js"]

	concatted = concat(js_files, ENV['compress'] == 'true')

	html = Template::TEMPLATE_TOP + concatted + Template::TEMPLATE_BOTTOM

	dest = './BDCRallyApp.html'

	File.open(dest, 'w') { |file| file.write(html) }
	puts "created #{dest}"
end

desc "runs 'cocos make'"
task :cocos_make do
	build_dir = '../build'
	if File.exists?(build_dir)
		puts "removing old build..."
		rm_r build_dir
	end

	system("(cocos make)")
end



def concat(files, compress) 
	compiler = Closure::Compiler.new(:language_in => 'ECMASCRIPT5')

	concatted = ""
  files.each do |script_name|
		puts "#{compress ? 'checking' : 'concatting'}: #{script_name}"
		raw = IO.read(script_name)
		# if minification fails, this will throw and kill the task, giving decent error output to boot
    compiler.compile(raw) if compress
		concatted += raw
  end

	if compress
		puts "compiling entire mess of JS together..."
		compiler.compile(concatted)
	else 
		concatted
	end
end

module Template
	TEMPLATE_TOP = <<-DONE
<!doctype html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <style type="text/css" media="screen">
            .cocos2d-app {
                width: 480px;
                height: 640px;
                display: block;
                margin: 0 auto;
            }
        </style>
    </head>
    <body>
        <div class="cocos2d-app">
						Loading...
						<div id="bdcLoadHook"></div>
						<script type="text/javascript">
							window.container = document.getElementById('bdcLoadHook').parentNode;
	DONE

	TEMPLATE_BOTTOM = <<-DONE
						</script>
				</div>
    </body>
</html>	
	DONE
end

