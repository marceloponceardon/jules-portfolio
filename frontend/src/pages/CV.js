// CV component
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function CV() {

	// URL for API calls related to CV
	const cvURL = process.env.REACT_APP_BACKEND_URL + "/cv";
	const [cvHTML, setCvHTML] = useState(null);

  useEffect(() => {
    const fetchRenderedCV = async () => {
      try {
        const response = await fetch(cvURL + "/rendered");
        if (response.ok) {
          const html = await response.text();
          setCvHTML(html);
        } else {
          console.error("Failed to fetch rendered CV:", response.status);
					setCvHTML("<p>Failed to fetch rendered CV: " + response.status + "</p>");
        }
      } catch (error) {
        console.error("Error fetching rendered CV:", error);
				setCvHTML("<p>Failed to fetch rendered CV: " + error + "</p>");
      }
    };

    fetchRenderedCV();
  }, [cvURL]);
	
	const handleDownload = async (response) => {
		const downloadToast = toast.loading('Downloading CV...');	
		// Make API call to download CV
		try {
			if (process.env.NODE_ENV === 'development') {
				console.log('URI:', cvURL + '/download');
			}

			const response = await fetch(cvURL + '/download', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/pdf',
				},
			});

			if (response.ok) {
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = 'jules-ferguson-cv.pdf';
				a.click();
				toast.update(downloadToast, {
					type: 'success',
					render: 'CV downloaded successfully',
					isLoading: false,
					closeButton: true
				});
			} else {
				toast.update(downloadToast, {
					render: 'Failed to download CV! (' + response.status + ')',
					type: 'error',
					isLoading: false,
					closeButton: true
				});
			}
		} catch (error) {
			console.error('Fetch error:', error);
			toast.update(downloadToast, {
				render: 'Failed to download CV',
				type: 'error',
				isLoading: false,
				closeButton: true
			});
		}
	};

	return (
		<div className="Page" id="cv">
			<span className="Content">
				<h2>CV</h2>
				<div className="CV"
					dangerouslySetInnerHTML={{ __html: cvHTML || '<p>waiting for CV...</p>' }}
				/>
				{/* Download button */}
				<button onClick={handleDownload}>
					Download as PDF
				</button>
			</span>
		</div>
	);
}

export default CV;
